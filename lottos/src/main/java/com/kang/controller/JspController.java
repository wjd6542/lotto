package com.kang.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class JspController {
	
	/**
	 * 최초 페이지 매핑
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/")
    public String index() throws Exception {
        return "index";
    }
	
	
	/**
	 * 최초 페이지 매핑
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/index")
    public String index2() throws Exception {
        return "index";
    }
	
	
	/**
	 * 로또 페이지
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/lotto")
    public String lotto() throws Exception {
        return "lotto";
    }
	
	
	/**
	 * 분석 페이지
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/hist")
    public String hist() throws Exception {
        return "hist";
    }
	
	
	/**
	 * 트렌드 페이지
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/trend")
    public String trend() throws Exception {
        return "trend";
    }
	

}
