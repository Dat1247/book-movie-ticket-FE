import Axios from "axios";
import { DOMAIN, TOKEN } from "../utils/settings/config";

class baseService {
	put = (url, model) => {
		return Axios({
			url: `${DOMAIN}/${url}`,
			method: "PUT",
			data: model,
			headers: {
				Authorization:
					"Bearer " + localStorage.getItem(TOKEN)?.replaceAll('"', ""),
			},
		});
	};

	get = (url) => {
		return Axios({
			url: `${DOMAIN}/${url}`,
			method: "GET",
			headers: {
				Authorization:
					"Bearer " + localStorage.getItem(TOKEN)?.replaceAll('"', ""),
			},
		});
	};

	post = (url, model, token) => {
		return Axios({
			url: `${DOMAIN}/${url}`,
			method: "POST",
			data: model,
			headers: {
				Authorization:
					"Bearer " + localStorage.getItem(TOKEN)?.replaceAll('"', ""),
			},
		});
	};

	delete = (url) => {
		return Axios({
			url: `${DOMAIN}/${url}`,
			method: "DELETE",
			headers: {
				Authorization:
					"Bearer " + localStorage.getItem(TOKEN)?.replaceAll('"', ""),
			},
		});
	};
}

export const BaseService = new baseService();
