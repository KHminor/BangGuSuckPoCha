package com.project.pocha.jwt;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

// 시큐리티의 BasicAuthenticationFilter
// 권한이나 인증이 필요한 특정 주소를 요청했을 때 위 필터 적용.
// 권한이나 인증이 필요한 주소가 아니라면 필터 적용 X
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    public JwtAuthorizationFilter(AuthenticationManager authenticationManager){
        super(authenticationManager);
    }
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {

    }
}