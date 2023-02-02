package com.server.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;


import lombok.*;

@Configuration
@RequiredArgsConstructor
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
	
	// WebSocketHandler 에 관한 생성자 추가
    // private final ChatHandler chatHandler;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // endpoint 설정 : /ws/chat
        // 이를 통해서 ws://localhost:8080/ws/chat 으로 요청이 들어오면 websocket 통신을 진행합니다.
        registry.addEndpoint("/ws/chat")
        	.setAllowedOriginPatterns("*")
        	.withSockJS()
        	.setClientLibraryUrl("https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.4.0/sockjs.min.js");
    }
    
    /*어플리케이션 내부에서 사용할 path를 지정할 수 있음*/
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
    // Client 에서 SEND 요청을 처리
    //Spring docs 에서는 /topic, /queue로 나오나 편의상 /pub, /sub로 변경
        registry.setApplicationDestinationPrefixes("/pub");
        //해당 경로로 SimpleBroker를 등록.
        // SimpleBroker는 해당하는 경로를 SUBSCRIBE하는 Client에게 메세지를 전달하는 간단한 작업을 수행
        registry.enableSimpleBroker("/sub");
        //enableStompBrokerRelay
        //SimpleBroker의 기능과 외부 Message Broker( RabbitMQ, ActiveMQ 등 )에 메세지를 전달하는 기능을 가짐
    }
    
}
