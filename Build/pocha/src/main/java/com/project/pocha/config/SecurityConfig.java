package com.project.pocha.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity  // 스프링 시큐리티 필터가 스프링 필터 체인에 등록.
// secured 어노테이션 활성화. (한개만 가능)
// preAuthorize, PostAuthorize 어노테이션 활성화. (hasRole를 통해 다중 확인 가능)
@EnableGlobalMethodSecurity(securedEnabled = true, prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable();

        http.authorizeRequests()
            // 인증 방식 선택.
            // - user, manager, admin으로 시작하는 URL에서만 적용.
            // - 나머지의 경우 모두 허용.
            //.antMatchers("/user/**").authenticated()
            //.antMatchers("/manager/**").access("hasRole('ROLE_ADMIN') or hasRole('ROLE_MANAGER')")
            //.antMatchers("/admin/**").access("hasRole('ROLE_ADMIN')")
            //.anyRequest().permitAll()
            .antMatchers("/**").permitAll()
            // 로그인 페이지 변경.
            .and()
            .formLogin()
//            .loginPage("/loginForm")
//            // 로그인 프로세스 변경. : 스프링 시큐리티가 로그인 진행.
//            .loginProcessingUrl("/login")
            // 로그인 성공시 기본 페이지.
            .defaultSuccessUrl("/");
//            .and()
//            .oauth2Login()
//            .loginPage("/loginForm")   // 구글 로그인이 완료된 뒤의 후처리 필요.
//            // 1. 코드 받기(인증).
//            // 2. 엑세스 토큰(권한).
//            // 3. 사용자 프로필 정보 가져오기.
//            // 4-1. 그 정보를 토대로 회원가입 자동으로 진행시키기도 함.
//            .userInfoEndpoint()
//            .userService(principalOauth2UserService);
    }
}
