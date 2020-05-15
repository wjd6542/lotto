package com.kang.cron;

import lombok.extern.slf4j.Slf4j;

import java.util.Map;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.kang.api.LottoApi;;

@Slf4j
@Component
public class LottoCron {
	
	private LottoApi lottoApi;
	
	/**
	 * 로또 최신번호 추출 진행
	 * @throws Exception
	 */
	/*
	@Scheduled(cron = "* 6 * * * *")
	public void run() throws Exception {
		Map<String, Object> map = lottoApi.getLastNum();
		String lastNum = (String) map.get("lastNum");
		
		lottoApi.getLottoData(lastNum);
		
		lottoApi.getLottoLocation(lastNum);
	}
	*/
}
