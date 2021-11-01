package com.yorumpaylasimuygulamasi.ws.shared;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;

import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.yorumpaylasimuygulamasi.ws.user.UniqueUsernameValidator;

@Target({ ElementType.PARAMETER }) 
@Retention(RUNTIME) 
@AuthenticationPrincipal
public @interface CurrentUser {
	

}
