package com.kru.rest.webservices.restfulwebservices.todos;


import java.net.URI;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@CrossOrigin(origins="http://localhost:4200")
@RestController
public class TodoJpaResource {
	
	@Autowired
	private TodoService todoService;
	
	@Autowired
	private TodoJpaRepository todoJpaRepository;


	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {
		return todoJpaRepository.findByUsername(username);
//		return todoService.findAll();		
	}

	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id) {
//		return todoService.findById(id);
		return todoJpaRepository.findById(id).get();
	}
	

	@DeleteMapping("/jpa/users/{username}/todos/{id}") 
	public ResponseEntity<Void> deleteTodoById(
			@PathVariable String username, @PathVariable long id) {
//		Todo todo = todoService.deleteById(id);
//		if (todo != null) {
//			return ResponseEntity.noContent().build();
//		}
//		return ResponseEntity.notFound().build();
		todoJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Todo> updateTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
//		Todo updated = todoService.save(todo);
		todo.setUsername(username);
		Todo updated = todoJpaRepository.save(todo);
		return new  ResponseEntity<Todo>(todo, HttpStatus.OK);
		
	}

	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Void> addTodo(@PathVariable String username, @PathVariable long id, @RequestBody Todo todo) {
//		Todo addedTodo = todoService.save(todo);
		todo.setUsername(username);
		Todo addedTodo = todoJpaRepository.save(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().
				path("{/id}").buildAndExpand(addedTodo.getId()).toUri();
		return ResponseEntity.created(uri).build();
		
	}
}
