package com.kang.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class JspController {

	/**
	 * jsp 페이지 매핑
	 * /modal/modal
	 * @param map
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/{page}", method=RequestMethod.GET) 
    public String jspPageMapping(@PathVariable  String page) throws Exception {
		if(page == null) {
			page = "index";
		}
        return page;
    }
}
