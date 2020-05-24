package cdtu.mall.item.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public interface AuthApi {

    @PostMapping("/login")
    public void authentication(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam HttpServletRequest request,
            @RequestParam HttpServletResponse response);
}
