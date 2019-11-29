import { ConfigHelperapp } from '../../app/helpers/configHelperapp';
import { Injectable } from '@angular/core';
import { ProviderBase } from '../../app/base/providerBase';
import { UsuarioModel } from '../../app/models/usuarioModel';
import { HttpProvider } from '../http/http';
import { HttpResultModel } from '../../app/models/HttpResultModel';

@Injectable()
export class UsuarioProvider extends ProviderBase<UsuarioModel>{

  url: string = `${ConfigHelperapp.Url}usuario`;

  constructor(public http: HttpProvider) {
    super(`${ConfigHelperapp.Url}usuario`, http);
  }

  async autenticate(email: string, senha: string): Promise<HttpResultModel> {
    return this.http.post(`${this.url}/autenticar`, { email: email, senha: senha });
  }

  async register(usuario: UsuarioModel): Promise<HttpResultModel> {
    return this.http.post(`${this.url}/register`, usuario);
  }

  static RegisterLogin(result: any) {
    localStorage.setItem(ConfigHelperapp.storageKeys.token, result.token);
    localStorage.setItem(ConfigHelperapp.storageKeys.user, JSON.stringify(result.usuario));
  }

  static get IsLogado(): boolean {
    return (localStorage.getItem(ConfigHelperapp.storageKeys.token) != undefined);
  }

}



