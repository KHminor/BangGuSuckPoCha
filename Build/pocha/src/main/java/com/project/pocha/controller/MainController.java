package com.project.pocha.controller;

import com.project.pocha.domain.user.User;
import com.project.pocha.domain.user.UserRepository;
import com.project.pocha.model.UserResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MainController {
	@Autowired
	UserRepository userRepository;

	@GetMapping(path = {"/", ""})
	public List<UserResponseDto> getUsers() {
		List<UserResponseDto> userResponseDtoList = userRepository.findAll()
			.stream()
			.map(user -> new UserResponseDto(user))
			.collect(Collectors.toList());

		return userResponseDtoList;
	}

	/**
	 * @apiNote POSTMAN(http://localhost:8080/user/join)으로 테스트.
	 * @param user userName, password, role
	 */
	@PostMapping("/user/join")
	public void joinUser(@RequestBody User user){
		userRepository.save(user);
	}
}
