import { user } from "../../api/interface/user"
import { ICommon } from "../../api/interface/common"

// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data?: T;
}

// * 分页响应参数
export interface ResPage<T> {
	datalist: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 登录
export namespace ILogin {
	export interface ReqLoginForm {
		email: string;
		passwd: string;
        captcha: string
	}
	export interface ResLogin {
		token?: string;
	}
	export interface ResUser {
		user: user;
	}
	
}

export namespace IRegister {
    export interface ReqRegisterForm {
        email: string;
        passwd: string;
        captcha: string;
    }
}

export namespace IForget {
	export interface ReqForgetForm {
		email: string,
		captcha: string
	}

	export interface ReqForgetPwdForm extends ICommon.DecryptionTimeSpan {
        passwd: string;
        captcha: string;
    }
}
