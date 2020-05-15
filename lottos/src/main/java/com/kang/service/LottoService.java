package com.kang.service;
import java.util.List;
import java.util.Map;


public interface  LottoService {
	// 로또 리스트 호출
	Map<String, Object> selectOneLottoMaster(Map<String, Object> map);
		
	// 로또 리스트 호출
	List<Map<String, Object>> selectLottoMaster(Map<String, Object> map);
	
	// 로또 디테일 호출
	List<Map<String, Object>> selectLottoDetail(Map<String, Object> map);
	
	// 로또 당첨첨 리스트
	List<Map<String, Object>> selectAddress(Map<String, Object> map);
	
	// 마지작 로또 번호 호출
	Map<String, Object> selectLastLotto() throws Exception;
	
	// 전체 위치 정보 리스트
	List<Map<String, Object>> selectAllAddress();
	
	// 지역별 로또 당첨 
	List<Map<String, Object>> selectAddrgroupData();
	
	// 지역별 로또 순위 10위
	List<Map<String, Object>> selectAddrRank();
	
	// 지역별 로또 순위 10위
	List<Map<String, Object>> selectFirstNumber();
	
	// 번호별 사용빈도
	List<Map<String, Object>> selectNumberFrequency();
	
	// 년도 data
	List<Map<String, Object>> selectYearData();
	
	// 로또번호별 정보 리스트
	List<Map<String, Object>> selectOneAddress(Map<String, Object> map);
	
	// 회차별 정보
	List<Map<String, Object>> selectOrderData();
	
	// 회차별 정보
	List<Map<String, Object>> selectAddrRanking();
	
	// 지역별 1등 게임 타입
	List<Map<String, Object>> selectAddrGameType();
	
	// 1등 지역구
	List<Map<String, Object>> selectAddrArea();
	
	// 역대 최고 판매 금액
	Map<String, Object> selectMaxRanking();
	
	// 최신 로또 정보
	Map<String, Object> selectLastNum();

	// 마스터 로도 삽입
	int insertLottoMaster(Map<String, Object> map);
	
	// 상세 테이블 삽입
	void insertLottoDetail(Map<String, Object> map);

	// 로또 주소 정보 삽입
	void insertLottoAddress(Map<String, Object> map);

	// 로또 정보 삽입
	void insertLotto(Map<String, Object> map);
}
