package com.kang.api;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.kang.impl.LottoImpl;
import com.kang.util.JsonUtil;

public class LottoApi {
	
	private static final Logger log = LogManager.getLogger(LottoImpl.class);
	
	public JsonUtil jsonUtil;
	
	
	/**
	 * 료또 마지막 번호 
	 * @param drawNo
	 * @return
	 * @throws Exception
	 */
	public Map<String, Object> getLastNum() throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String startDate = "2002-12-07 23:59:59";
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
		Date cDate = new Date();
		Date sDate = dateFormat.parse(startDate);
		long diff = cDate.getTime() - sDate.getTime();
		long nextEpi = (diff / (86400 * 1000 * 7)) + 1;
		map.put("lastNum", (int) nextEpi);
		return map;
	}
	
	/**
	 * 료또 당첨 정보 
	 * @param drawNo
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> getLottoData(String drawNo) throws Exception {

		// api 요청 경로
    	String appUrl 	= "https://www.geniecontents.com/api/v1/lotto?drawNo=" + drawNo;
		String line 	= ""; 
		String result	= "";
		URL url 		= new URL(appUrl);
		BufferedReader bf;
		Map<String, Object> map = new HashMap<String, Object>();
		
		
		JSONObject jsonObj = null;
		
		// 예외처리
		try {
			
			// api data get
			bf = new BufferedReader(new InputStreamReader(url.openStream()));
			
			// 반복하여 데이터 추출
			while((line = bf.readLine())!=null) { 
				result = result.concat(line); 
			}
			
			// json data 삽입
			JSONParser parser = new JSONParser(); 
			jsonObj = (JSONObject) parser.parse(result);
			
			JSONObject body	=  (JSONObject) jsonObj.get("body");
			JSONArray list	= (JSONArray) body.get("lottoResult");
			
			
			// body  추출
			Map<String, Object> maps = JsonUtil.getMapFromJsonObject(body);
			
			// rows 추출
			List<Map<String, Object>> resultArr = JsonUtil.getListMapFromJsonArray(list);
			
			String [] keyArr = {"drawNo","num1","num2","num3","num4","num5","num6","bonusNum","totalSellingPrice","bonusNum","drawDate"};
			
			for (String key : keyArr) {
				map.put(key, maps.get(key));
			}
			
			map.put("resultArr", resultArr);

			// map 삽입
			log.info("로또 api 통신 완료");
			
		} catch (Exception e) {
			log.error("로또 api 통신 실패");
			log.error(e.getMessage());
			map.put("status", "fail");
		}
		
		return map;
	}
	
	
	/**
	 * 로또 당첨 위치 정보
	 * @param drawNo
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> getLottoLocation(String drawNo) throws Exception {
		// api 요청 경로
    	String appUrl 	= "https://www.geniecontents.com/api/v1/lotto/winning/places?drawNo=" + drawNo;
		String line 	= ""; 
		String result	= "";
		URL url 		= new URL(appUrl);
		BufferedReader bf;
		Map<String, Object> map = new HashMap<String, Object>();
		
		
		JSONObject jsonObj = null;
		
		// 예외처리
		try {
			
			// api data get
			bf = new BufferedReader(new InputStreamReader(url.openStream()));
			
			// 반복하여 데이터 추출
			while((line = bf.readLine())!=null) { 
				result = result.concat(line); 
			}
			
			// json data 삽입
			JSONParser parser = new JSONParser(); 
			jsonObj = (JSONObject) parser.parse(result);
			
			
			// body  추출
			JSONObject body = (JSONObject) jsonObj.get("body"); 
			JSONArray resultArr = (JSONArray) body.get("winningPlaces");
			
			map.put("resultArr", resultArr);
			map.put("body", body);
			map.put("status", "succ");
			// map 삽입
			log.info("로또 api 통신 완료");
			
		} catch (Exception e) {
			log.error("로또 api 통신 실패");
			log.error(e.getMessage());
			map.put("status", "fail");
		}
		
		return map;
	}

	
}
