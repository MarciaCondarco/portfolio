//Selecionar a seção about

const about = document.querySelector('#about');

//selecionar o formulario
const formulario = document.querySelector('#formulario');

// expressão regular para validadeção de e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

//função assincrona para buscar os dados no github 

async function getApiGithub(){

    try{

        //fazendo uma requisição get para a api do github
        const dadosPerfil = await fetch('https://api.github.com/users/MarciaCondarco');

        // converter respostas da api para json
        const perfilJson = await dadosPerfil.json();
        

        // criando os dados do html 

        let conteudo = `
        
            <!-- FOTO DO PERFIL -->
            <figure class="about_image">
                <img
                    src="${perfilJson.avatar_url}"
                    alt="Foto do perfil do GitHub - ${perfilJson.name}."
                >
            </figure>

            <!-- CONTEÚDO DO PERFIL -->
            <article class="about_content">

                <h2>Sobre mim</h2>
                <p>Sou desenvolvedora FullStack, mulher na tecnologia, também gosto de estudar sobre cibersegurança, valorizo o bem-estar e isso realizo hobbies, como caminhar e desenhar, a minha frase favorita é "nunca é tarde para começar algo novo", minha cor favorita é o vinho, eu prefiro ações do que palavras. 
                <br>Você conheceu um pouquinho sobre mim.</p>

                <div class="about_stats">
                    <a href="${perfilJson.html_url}" target="_blank" class="botao">Ver GitHub</a>
                    
                    <!-- Faltou esta div para alinhar os cards -->
                    <div class="stats-wrapper">
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.followers}</p>
                            <p class="stat-label">Seguidores</p>
                        </div>
                        <div class="stat-item">
                            <p class="stat-number">${perfilJson.public_repos}</p>
                            <p class="stat-label">Repositórios</p>
                        </div>
                    </div>

                </div>
            </article>

        `

        //PASSO 04: Adicionar o HTML dentro da Seção About

        about.innerHTML += conteudo;

    }catch(error){
        console.error(error);
    }
}

//função de envio e validação do formulario
formulario.addEventListener('submit', function(event){
    //preventdefault - não envio o form até fazer a validação
    event.preventDefault();
    //validação do campo nome
    const campoNome = document.querySelector('#nome');
    const txtNome = document.querySelector('#txtNome');
    //nome precisa ter no minimo 3 caracteres
    if(campoNome.value.length < 3){
        txtNome.innerHTML = 'O nome deve ter no minimo 3 caracteres';
        campoNome.focus();
        return;
    }else{
        txtNome.innerHTML = '';
    }

     //validação do campo e-mail
    const campoEmail = document.querySelector('#email');
    const txtEmail = document.querySelector('#txtEmail');

    //nome precisa ter no minimo 3 caracteres
    if(!campoEmail.value.match(emailRegex)){
        txtEmail.innerHTML = 'Digite email valido';
        campoEmail.focus();
        return;
    }else{
        txtEmail.innerHTML = '';
    }

    //campo assunto

    //validação do campo nome
    const campoAssunto = document.querySelector('#assunto');
    const txtAssunto = document.querySelector('#txtAssunto');
    //nome precisa ter no minimo 3 caracteres
    if(campoAssunto.value.length < 5){
        txtAssunto.innerHTML = 'O assunto deve ter no minimo 5 caracteres';
        campoAssunto.focus();
        return;
    }else{
        txtAssunto.innerHTML = '';
    }
    //Se passou por todas as validações
    formulario.submit();
})


// Chamar a função getAPIGithub()

getApiGithub();