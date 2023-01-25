package com.server.back.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.server.back.config.oauth.Provider.NaverToken;
import com.server.back.domain.user.User;
import com.server.back.domain.user.UserRepository;
import com.server.back.jwt.JwtToken;
import com.server.back.jwt.service.JwtService;
import com.server.back.service.user.NaverService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.Map;


@RestController
@RequiredArgsConstructor
public class RestApiController {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final NaverService naverService;

    /**
     * JWT 를 이용한 로그인
     */
    @GetMapping("/home")
    public String home() {
        return "index";
    }

//    @PostMapping("/join")
//    public String join(@ModelAttribute User user){
//
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
//        user.setRole("USER");
//        user.setTime(LocalDateTime.now());
//        userRepository.save(user);
//
//        return "회원가입완료";
//    }

//    @GetMapping("/api/v1/user")
//    public String test1() {
//        return "success";
//    }
//
//    @GetMapping("/api/v1/manager")
//    public String test2() {
//        return "success";
//    }
//    @GetMapping("/api/v1/admin")
//    public String test3() {
//        return "success";
//    }



    /**
     * JWT를 이용한 네이버 로그인
     */

    @GetMapping("/api/oauth2/token/naver")
    public Map<String, String> NaverLogin(@RequestParam("code") String code) {

        NaverToken oauthToken = naverService.getAccessToken(code);

        User saveUser = naverService.saveUser(oauthToken.getAccess_token());

        JwtToken jwtToken = jwtService.joinJwtToken(saveUser.getUsername());

        return jwtService.successLoginResponse(jwtToken);
    }
    @GetMapping("/login/oauth2/code/naver")
    public String NaverCode(@RequestParam("code")String code,@RequestParam("state")String state) {
        return "네이버 로그인 인증완료, code: "+ code + "네이버 로그인 인증완료, state: "  + state;
    }


    /**
     * refresh token 재발급
     * @return
     */
    @GetMapping("/refresh/{username}")
    public Map<String,String> refreshToken(@PathVariable("username") String username, @RequestHeader("refreshToken") String refreshToken,
                                           HttpServletResponse response) throws JsonProcessingException {

        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");

        JwtToken jwtToken = jwtService.validRefreshToken(username, refreshToken);
        Map<String, String> jsonResponse = jwtService.recreateTokenResponse(jwtToken);

        return jsonResponse;
    }
}
