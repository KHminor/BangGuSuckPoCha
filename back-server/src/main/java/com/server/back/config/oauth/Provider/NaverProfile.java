package com.server.back.config.oauth.Provider;

import lombok.Data;

@Data
public class NaverProfile {

    public String resultcode;
    public String message;
    public Response response;

    @Data
    public class Response {
        public String id;
        public String gender;
        public String birthday;
        public String birthyear;
    }
}
