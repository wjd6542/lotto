package com.kang.controller;
import java.text.SimpleDateFormat;
import java.util.*;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.kang.service.LottoService;


@Controller
public class LottoController {
	
	@Autowired 
	LottoService lottoService;
	
    /**
     * 로또 data 호출 
     * @link /lotto/getLottoMaster
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getLottoMaster", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getLottoData(@RequestParam("drawNo") String drawNo) throws Exception {
		// api 요청 경로
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("drawNo", drawNo);
		Map<String, Object> data = lottoService.selectOneLottoMaster(map);
		return data;
	}
	
	/**
     * 로또 상세 정보 호출
     * @link /lotto/getLottoDetail
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getLottoDetail", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getLottoDetail(@RequestParam("drawNo") String drawNo) throws Exception {
		// api 요청 경로
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("drawNo", drawNo);
		List<Map<String, Object>> list = lottoService.selectLottoDetail(map);
		return list;
	}
	
	/**
	 * 로또 당첨 장소 호출
	 * @link /lotto/getLottoLocation
	 * @param drawNo
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/lotto/getLottoLocation", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getLottoLocation(@RequestParam("drawNo") String drawNo) throws Exception {
		// api 요청 경로
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("drawNo", drawNo);
		List<Map<String, Object>> list = lottoService.selectAddress(map);
		return list;
	}
	
	/**
	 * 마지막 로또 번호 계산 함수
	 * @link /lotto/getLastLottoNum
	 * @param res
	 * @param req
	 * @return Map
	 * @throws Exception
	 */
	@RequestMapping(value="/lotto/getLastLottoNum", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> getLastLottoNum() throws Exception {
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
     * 로또 상세 정보 호출
     * @link /lotto/getAddrgroupData
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getAddrgroupData", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getAddrgroupData() throws Exception {
		return lottoService.selectAddrgroupData();
	}
	
	/**
     * 로또 상세 정보 호출
     * @link /lotto/getAddrRank
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getAddrRank", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getAddrRank() throws Exception {
		return lottoService.selectAddrRank();
	}
	
	/**
     * 로또 최대 번호 호출
     * @link /lotto/getFirstNumber
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getFirstNumber", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getFirstNumber() throws Exception {
		return lottoService.selectFirstNumber();
	}
	
	/**
     * 번호별 사용빈도 조회
     * @link /lotto/getNumberFrequency
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getNumberFrequency", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getNumberFrequency() throws Exception {
		return lottoService.selectNumberFrequency();
	}
	
	/**
     * 년도별 데이터 추출
     * @link /lotto/getYearData
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getYearData", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> getYearData() throws Exception {
		return lottoService.selectYearData();
	}
	
	/**
     * 역대 최고 판매금액 조회
     * @link /lotto/getMaxRanking
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getMaxRanking", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> selectMaxRanking() throws Exception {
		return lottoService.selectMaxRanking();
	}

	/**
     * 역대 최고 판매금액 조회
     * @link /lotto/getLastNum
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getLastNum", method=RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> selectLastNum() throws Exception {
		return lottoService.selectLastNum();
	}
	
	/**
     * 회차별 정보
     * @link /lotto/getOrderData
     * @param res
     * @param req
     * @return Map
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getOrderData", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectOrderData() throws Exception {
		return lottoService.selectOrderData();
	}
	
	/**
     * 회차별 1등 당첨 주소
     * @link /lotto/getAddrRanking
     * @param res
     * @param req
     * @return list
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getAddrRanking", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectAddrRanking() throws Exception {
		return lottoService.selectAddrRanking();
	}
	
	/**
     * 지역별 1등 게임 타입
     * @link /lotto/getAddrGameType
     * @param res
     * @param req
     * @return list
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getAddrGameType", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectAddrGameType() throws Exception {
		return lottoService.selectAddrGameType();
	}
	
	/**
     * 1등 지역구
     * @link /lotto/getAddrArea
     * @param res
     * @param req
     * @return list
     * @throws Exception
     */
	@RequestMapping(value="/lotto/getAddrArea", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectAddrArea() throws Exception {
		return lottoService.selectAddrArea();
	}
	
	
	/**
     * 레포트 - 년도별 정보
     * @link /lotto/selectReportYearData
     * @param res
     * @param req
     * @return list
     * @throws Exception
     */
	@RequestMapping(value="/lotto/reportYearData", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectReportYearData() throws Exception {
		return lottoService.selectReportYearData();
	}
	
	/**
     * 레포트 - 월별 정보
     * @link /lotto/selectReportYearData
     * @param res
     * @param req
     * @return list
     * @throws Exception
     */
	@RequestMapping(value="/lotto/reportMonthData", method=RequestMethod.POST)
	@ResponseBody
	public List<Map<String, Object>> selectReportMonthData() throws Exception {
		return lottoService.selectReportMonthData();
	}
	
	
	
	/**
	 * 로또 정보 삽입
	 * @link /lotto/insertlotto
	 * @param res
	 * @param req
	 * @throws Exception
	 */
	@RequestMapping(value="/lotto/insertlotto", method=RequestMethod.GET)
	@ResponseBody
	public void  insertlotto(HttpServletRequest request) throws Exception {
		String drawNo = request.getParameter("drawNo");
		try {
		
			if(drawNo == null) {
				
				System.out.println("check !!" + drawNo);
				
				for (int i = 910; i < 927; i++) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("drawNo",  String.valueOf(i));
					// 1초 지연
					Thread.sleep(200);
					lottoService.insertLotto(map);
					System.out.println("insert " + i + "\n");
				}
			} else {
				System.out.println("check !!" + drawNo);
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("drawNo",  drawNo);
				lottoService.insertLotto(map);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 주소 정보 삽입
	 * @link /lotto/insertlottoAddress
	 * @param res
	 * @param req
	 * @throws Exception
	 */
	@RequestMapping(value="/lotto/insertlottoAddress", method=RequestMethod.GET)
	@ResponseBody
	public void  insertlottoAddress(HttpServletRequest request) throws Exception {
		String drawNo = request.getParameter("drawNo");
		try {
		
			if(drawNo  == null) {
				for (int i = 910; i < 927; i++) {
					Map<String, Object> map = new HashMap<String, Object>();
					map.put("drawNo",  String.valueOf(i));
					// 1초 지연
					Thread.sleep(200);
					lottoService.insertLottoAddress(map);
					System.out.println("insert " + i + "\n");
				}
			} else {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("drawNo",  drawNo);
				lottoService.insertLottoAddress(map);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}