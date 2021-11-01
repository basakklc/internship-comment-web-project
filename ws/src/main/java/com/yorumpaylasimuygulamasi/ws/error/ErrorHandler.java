package com.yorumpaylasimuygulamasi.ws.error;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.error.ErrorAttributeOptions;
import org.springframework.boot.web.error.ErrorAttributeOptions.Include;
import org.springframework.boot.web.servlet.error.DefaultErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorAttributes;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;


@RestController
public class ErrorHandler  implements ErrorController {
  
  @Autowired
  private ErrorAttributes errorAttributes;
  
  @RequestMapping("/error")
  ApiError errorHandle(WebRequest request) {
      Map<String, Object> body =this.errorAttributes.getErrorAttributes(request,ErrorAttributeOptions.of(Include.MESSAGE,Include.BINDING_ERRORS));
      String message = (String)body.get("message");
      String path = (String)body.get("path");
      int status=(Integer)body.get("status");
      ApiError error = new ApiError(status, message, path);
      
    
      
      if(body.containsKey("errors")) {
    	  List<FieldError> fieldErrors = (List<FieldError>) body.get("errors"); 
    	  Map<String,String> validationErrors = new HashMap<>();
  		  for(FieldError fieldError: fieldErrors) {
  			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
  		}
  		
  		error.setValidationErrors(validationErrors);
      }
      
		return error;
     
  }

  public String getErrorPath() {
      return "/error";
  }
}