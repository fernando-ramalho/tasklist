# tasklist
Este é o repositório para a aplicação de exemplo tasklist

# Task List - Client-Side: Angular + Server Side: Web API 

by [Fernando Ramalho][1] (on [Google+][2])

__*NOTE: Este projeto é somente para demonstração .*__

__Demo:__ [View the online demo][3]
* usuários: `user@supero.com` e `admin@supero.com`;
* senha: `Supero123`

Proposta de aplicação de exemplo para apresentação em etapa de processo seletivo que contempla as seguintes características:
```
* Versionamento com Git;
* Camada de front-end independente do back-end;
* Camada de backend com API REST 
* Utilização de frameworks Angular e Bootstrap;
* Utilização de frameworks para acesso a dados EntityFramework;
* Utilização de um padrões de desenvolvimento mínimo, nomenclaturas, arquitetura;
* Aplicação de conceitos fortes, design patterns e divisão da arquitetura quando entendido como necessário.
* Estilização básica do frontend, responsividade e usabilidade;
```
Pretendeu-se atender aos seguintes requisitos funcionais: 
```
* Adicionar novas tarefas;
* Marcar e desmarcar o status de concluído;
* Editar o conteúdo da task;
* Deletar uma task;
* Cada tarefa possuirá as seguintes informações: título, status, descrição, datas de criação, edição, remoção e conclusão. 
```
## Arquitetura da solução

Como se trata de uma aplicação pequena de demonstração foi utilizado com parcimônia conceitos de arquitetura e padrões de desenvolvimento, pois a proposta não tinha a pretensão de ser modelo de referência mas sim de atender aos requisitos exigidos com a maior simplicidade e clareza possível para permitir fácil compreensão porém sem prescindir da utilização de alguns padrões e tecnologias consideradas mais complexas quando fosse o caso.

* __Aplicação Cliente__: A solução proposta utilizou no fron-end da aplicação a versão 6 do framework javascript [Angular][9], pelas conhecidas vantagens proporcionadas como por exemplo a quantidade de documentação existente, suporte aos desenvolvedores através da comunidade ativa e também pela grande utilização alcançada.
* __Servidor Web__: Como servido web foi utilizado o IIS ([Internet Information Services][4]) da microsoft como servidor back-end.  
* __Tecnologia no Back-end__: Como primeira camada de resposta para as requisições da aplicação cliente foi utilizada [ASP.NET Web API][8] que é uma plataforma poderosa para criar APIs que exponham serviços e dados. Como HTTP é simples e flexível ele tem a capacidade de atingir uma ampla variedade de clientes, incluindo navegadores, dispositivos móveis e aplicativos de desktop tradicionais.
* __Acesso a dados__. Na camada de acesso a dados foi utilizado o Entity Framework 6 como mecanismo de [O/RM][7]. Para facilitar o processo de mapeamento dos objetos de banco de dados para o modelo de classes foi utilizada a extensão [Entity Framework Power Tools ][5] que fornece funcionalidades no Visual Studio para realizar a engenharia reversa do modelo de dados. 
* __Autenticação e autorização__. Para a autenticação e autorização foi utilizada a plataforma [Auth0][6] para facilitar a incorporação de uma segurança básica e administração dos perfis de usuários. 

[1]: https://www.linkedin.com/in/fernando-ramalho-barbosa/
[2]: https://plus.google.com/112001880695380308855?rel=author
[3]: http://www.tasklistsupero.somee.com
[4]: https://pt.wikipedia.org/wiki/Internet_Information_Services
[5]: https://msdn.microsoft.com/en-us/library/jj593170(v=vs.113).aspx
[6]: https://auth0.com/
[7]: https://en.wikipedia.org/wiki/Object-relational_mapping
[8]: https://docs.microsoft.com/en-us/aspnet/web-api/
[9]: https://angular.io/
