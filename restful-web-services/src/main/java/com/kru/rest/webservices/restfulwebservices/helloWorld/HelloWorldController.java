package com.kru.rest.webservices.restfulwebservices.helloWorld;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class HelloWorldController {

	@RequestMapping(method=RequestMethod.GET, path="helloworld")
	public String hellowWorld() {
		return "Hello world";
	}

	@GetMapping(path="helloworld-bean")
	public HelloWorldBean hellowWorldBean() {
		return new HelloWorldBean("Hello world");
	}
	
	@GetMapping(path="hello-world/path/{name}")
	public HelloWorldBean helloWorldPath(@PathVariable String name) throws Exception {
		return new HelloWorldBean(String.format("Hello world, %s", name));
	}
}
