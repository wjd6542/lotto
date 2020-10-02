package com.kang.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.kang.dao.LottoDao;
import com.kang.api.LottoApi;
import com.kang.service.LottoService;

@Service
public class LottoImpl implements  LottoService {
	
	private static final Logger log = LogManager.getLogger(LottoImpl.class);

	@Autowired
	private LottoDao lottoDao;
	
	private LottoApi LottoApi;

	
	// 로또 정보 삽입
	@SuppressWarnings("unchecked")
	public void insertLotto(Map<String, Object> obj) {
		try {
			Map<String, Object> map 		= com.kang.api.LottoApi.getLottoData( (String) obj.get("drawNo") );
			List<Map<String, Object>> list	= (List<Map<String, Object>>) map.get("resultArr");

			// 마스터 입력
			int masterNum = lottoDao.insertLottoMaster(map);
			
			// 디테일 정보 입력
			for (int i = 0; i < list.size(); i++)
			{
				Map<String, Object> listMap = list.get(i);
				
				listMap.put("masterNum", masterNum);
				listMap.put("lottoRank", i + 1);
				listMap.put("drawNo", (String) obj.get("drawNo"));
				listMap.put("drawDate", map.get("drawDate"));
				lottoDao.insertLottoDetail(listMap);
				
				
			}
			
			log.info( (String) obj.get("drawNo") + " 로또 정보 등록 완료");
		} catch (Exception e) {
			log.error("로또 정보 등록 실패");
			log.error(e.getMessage());
			e.printStackTrace();
		}
	}

	// 로또 당첨 지역 삽입
		@SuppressWarnings("unchecked")
		@Override
	public void insertLottoAddress(Map<String, Object> obj) {
			try {
				
				Map<String, Object> map 		= com.kang.api.LottoApi.getLottoLocation((String) obj.get("drawNo"));
				Map<String, Object> body		= (Map<String, Object>) map.get("body");
				List<Map<String, Object>> list	= (List<Map<String, Object>>) map.get("resultArr");
				
				Map<String, Object> mapping		= new HashMap<String, Object>();
				mapping.put("MANUAL", "수동");
				mapping.put("AUTO", "자동");
				mapping.put("SEMI_AUTO", "반자동");
				
				// 상품정보가 들어있는경우만 호출함
				if(!map.get("status").equals("fail")) 
				{
					// 디테일 정보 입력
					for (int i = 0; i < list.size(); i++)
					{
						Map<String, Object> listMap = list.get(i);
						String addr = (String) listMap.get("address");
						String [] add  = addr.split("\\s");
						listMap.put("addrType1", add[0]);
						listMap.put("addrType2", add[1]);
						listMap.put("drawNo", body.get("drawNo"));
						listMap.put("drawDate", body.get("drawDate"));
						listMap.put("gameType", mapping.get( listMap.get("gameType") ));
						lottoDao.insertLottoAddress(listMap);
					}
				} else {
					Map<String, Object> listMap = new HashMap<String, Object>();
					listMap.put("drawNo", (String) obj.get("drawNo"));
					lottoDao.insertLottoAddress(listMap);
				}
				
				log.info((String) obj.get("drawNo") + " 로또 정보 등록 완료");
				log.info("로또 정보 등록 완료");
			} catch (Exception e) {
				log.error("로또 정보 등록 실패");
				log.error(e.getMessage());
			}
			
		}


	
	@Override
	public int insertLottoMaster(Map<String, Object> map) {
		return 0;
	}

	
	@Override
	public void insertLottoDetail(Map<String, Object> map) {
		
	}
	
	

	public List<Map<String, Object>> selectLotto(Map<String, Object> map) {
		return null;
	}



	@Override
	public List<Map<String, Object>> selectAddress(Map<String, Object> map) {
		List<Map<String, Object>> list = lottoDao.selectAddress(map);
		return list;
	}



	@Override
	public Map<String, Object> selectLastLotto() throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		try {
			map = LottoApi.getLastNum();
		} catch (Exception e) {
			log.error("로또 정보 등록 실패");
			log.error(e.getMessage());
		}
		return map;
	}



	@Override
	public List<Map<String, Object>> selectAllAddress() {
		return null;
	}



	@Override
	public List<Map<String, Object>> selectAddrgroupData() {
		List<Map<String, Object>> list = lottoDao.selectAddrgroupData();
		return list;
	}



	@Override
	public List<Map<String, Object>> selectOneAddress(Map<String, Object> map) {
		List<Map<String, Object>> list = lottoDao.selectOneAddress(map);
		return list;
	}

	@Override
	public Map<String, Object> selectOneLottoMaster(Map<String, Object> map) {
		Map<String, Object> data = lottoDao.selectOneLottoMaster(map);
		return data;
	}

	@Override
	public List<Map<String, Object>> selectLottoMaster(Map<String, Object> map) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Map<String, Object>> selectLottoDetail(Map<String, Object> map) {
		List<Map<String, Object>> list = lottoDao.selectLottoDetail(map);
		return list;
	}

	
	@Override
	public List<Map<String, Object>> selectAddrRank() {
		List<Map<String, Object>> list = lottoDao.selectAddrRank();
		return list;
	}

	@Override
	public List<Map<String, Object>> selectFirstNumber() {
		List<Map<String, Object>> list = lottoDao.selectFirstNumber();
		return list;
	}

	@Override
	public List<Map<String, Object>> selectNumberFrequency() {
		List<Map<String, Object>> list = lottoDao.selectNumberFrequency();
		return list;
	}

	@Override
	public List<Map<String, Object>> selectYearData() {
		List<Map<String, Object>> list = lottoDao.selectYearData();
		return list;
	}

	@Override
	public Map<String, Object> selectMaxRanking() {
		Map<String, Object> map = lottoDao.selectMaxRanking();
		return map;
	}

	@Override
	public Map<String, Object> selectLastNum() {
		Map<String, Object> map = lottoDao.selectLastNum();
		return map;
	}

	@Override
	public List<Map<String, Object>> selectOrderData() {
		List<Map<String, Object>> list = lottoDao.selectOrderData();
		return list;
	}

	@Override
	public List<Map<String, Object>> selectAddrRanking() {
		List<Map<String, Object>> list = lottoDao.selectAddrRanking();
		return list;
	}

	@Override
	public List<Map<String, Object>> selectAddrGameType() {
		List<Map<String, Object>> list = lottoDao.selectAddrGameType();
		return list;
	}

	@Override
	public List<Map<String, Object>> selectAddrArea() {
		List<Map<String, Object>> list = lottoDao.selectAddrArea();
		return list;
	}

	@Override
	public List<Map<String, Object>> selectReportYearData() {
		return lottoDao.selectReportYearData();
	}

	@Override
	public List<Map<String, Object>> selectReportMonthData() {
		return lottoDao.selectReportMonthData();
	}

}
