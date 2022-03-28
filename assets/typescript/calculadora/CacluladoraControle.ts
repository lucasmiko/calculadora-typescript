import DataHora from "./DataHora.js";
import Tela from "./Tela.js";
import Operacao from "./Operacao.js";

export default class CalculadoraControle {

    constructor(
        private tela = new Tela(),
        private operacao = new Operacao({
            onCalculado: (resultado: string) => this.tela.conteudo = resultado
        })
    ) {

        new DataHora();

        this.eventosBotoes();
        this.eventosTeclas();

    }

    eventosTeclas(): void {

        window.addEventListener("keydown", (evento: KeyboardEvent) => {
            switch (evento.key) {
                case "0":
                case "1":
                case "2":
                case "3":
                case "4":
                case "5":
                case "6":
                case "7":
                case "8":
                case "9":
                    this.adicioanrNumero(Number(evento.key));
                break;

                case "%":
                case "+":
                case "-":
                case "*":
                case "/":
                    this.adicionarOperador(evento.key);
                break;

                case "Enter":
                case "=":
                    this.calcular();
                break;

                case ".":
                case ",":
                    this.adicionarPonto();
                break;

                case "Backspace":
                    this.desfazer();
                break;

                case "z":
                    if (evento.ctrlKey || evento.metaKey) {
                        this.desfazer();
                    }
                break;

                case "Delete":
                case "Escape":
                    this.limpar();
                break;
            }
        })

    }

    eventosBotoes(): void {
        
        document.querySelectorAll("#teclado button").forEach(e => {
            e.addEventListener("click", (evento: Event) => {


                const target = evento.target as HTMLButtonElement;
                
                switch (target.id) {
                    case "zero":
                    case "um":
                    case "dois":
                    case "tres":
                    case "quatro":
                    case "cinco":
                    case "seis":
                    case "sete":
                    case "oito":
                    case "nove":
                        this.adicioanrNumero(Number(target.dataset.valor));
                    break;

                    case "adicao":
                    case "subtracao":
                    case "divisao":
                    case "multiplicacao":
                        this.adicionarOperador(String(target.dataset.valor))
                    break;

                    
                    case "ponto":
                        this.adicionarPonto();
                    break;

                    
                    case "desfazer":
                        this.desfazer();
                    break;

                    
                    case "limpar":
                        this.limpar();
                    break;

                    
                    case "porcentagem":
                        this.porcentagem();

                    break;

                    
                    case "igual":
                        this.calcular();

                    break;
                }
            })
        })
    }

    limpar(){

        this.operacao.limpar();

        this.tela.conteudo = "0";

    }

    desfazer () {

        this.tela.conteudo = this.operacao.desfazer();

    }

    porcentagem(): void {

        this.tela.conteudo = this.operacao.porcentagem();

    }

    calcular(): void{

        this.operacao.calcular();
    }

    adicionarOperacao(valor: string): void {

        this.operacao.adicionar(valor);

        console.log(this.operacao.length);
    }

    adicioanrNumero(numero: number): void {

        if (isNaN(Number(this.operacao.ultimaPosicao))) {

            this.adicionarOperacao(numero.toString())
            
        } else {

            numero = Number(this.operacao.ultimaPosicao.toString() + numero.toString());

            this.operacao.ultimaPosicao = numero.toString()
        }

        this.tela.conteudo = numero.toString();

    }

    adicionarOperador(operador: string): void {

        if (isNaN(Number(this.operacao.ultimaPosicao))) {

            this.operacao.ultimaPosicao = operador;

        } else {

            if (this.operacao.length === 0) {
                this.adicionarOperacao("0");
            }

            this.adicionarOperacao(operador)
        }

    }

    adicionarPonto(): void {

        const ultimaPosicao = this.operacao.ultimaPosicao;

        if (this.verificarOperador(ultimaPosicao)) {

            this.adicionarOperacao("0.");

        } else if (ultimaPosicao.indexOf(".") === -1) {

            this.operacao.ultimaPosicao = `${ultimaPosicao}.`;

        }


        this.tela.conteudo = this.operacao.ultimaPosicao;
    }

    verificarOperador(valor: string): boolean {
        
        return ["+", "-", "*", "/", "%"].includes(valor);
    }
}