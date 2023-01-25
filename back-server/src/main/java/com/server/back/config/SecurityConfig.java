package com.server.back.config;

import com.server.back.config.oauth.CustomOAuth2UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final CorsConfig corsConfig;
    private final CustomOAuth2UserService customOAuth2UserService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .headers().frameOptions().disable()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                // @CrossOrigin
                .addFilter(corsConfig.corsFilter())
                // 기본적인 http 동작 사용 X
                // - form 로그인 사용X
                .formLogin().disable()
                // - http 기본 인증 사용X (id, pw를 헤더에 담아 인증하는 방식)
                .httpBasic().disable()
                // AuthenticationManager 필수
                //.addFilter(new JwtAuthenticationFilter(authenticationManager()))
                //.addFilter(new JwtAuthorizationFilter(authenticationManager()/*, 유저 레포지토리*/))
                .authorizeRequests()
                .antMatchers("/**").permitAll();
//                .antMatchers("/", "/css/**", "/images/**", "/js/**", "/h2-console/**").permitAll()
//                .antMatchers("/api/v1/**").access("hasRole('ROLE_USER')")
//                .anyRequest().authenticated()
//                .and()
//                .logout()
//                .logoutSuccessUrl("/")
//                .and()
//                .oauth2Login()
//                .userInfoEndpoint()
//                .userService(customOAuth2UserService);
    }
}
