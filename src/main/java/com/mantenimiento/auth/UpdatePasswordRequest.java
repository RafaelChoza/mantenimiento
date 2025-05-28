package com.mantenimiento.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdatePasswordRequest {

    private String oldPassword;
    private String newPassword;

}
