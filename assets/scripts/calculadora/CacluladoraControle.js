import DataHora from "./DataHora.js";
import Tela from "./Tela.js";
import Operacao from "./Operacao.js";
export default class CalculadoraControle {
    constructor(tela = new Tela(), operacao = new Operacao({
        onCalculado: (resultado) => this.tela.conteudo = resultado
    })) {
        this.tela = tela;
        this.operacao = operacao;
        new DataHora();
        this.eventosBotoes();
        this.eventosTeclas();
    }
    eventosTeclas() {
        window.addEventListener("keydown", (evento) => {
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
        });
    }
    eventosBotoes() {
        document.querySelectorAll("#teclado button").forEach(e => {
            e.addEventListener("click", (evento) => {
                const target = evento.target;
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
                        this.adicionarOperador(String(target.dataset.valor));
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
            });
        });
    }
    limpar() {
        this.operacao.limpar();
        this.tela.conteudo = "0";
    }
    desfazer() {
        this.tela.conteudo = this.operacao.desfazer();
    }
    porcentagem() {
        this.tela.conteudo = this.operacao.porcentagem();
    }
    calcular() {
        this.operacao.calcular();
    }
    adicionarOperacao(valor) {
        this.operacao.adicionar(valor);
        console.log(this.operacao.length);
    }
    adicioanrNumero(numero) {
        if (isNaN(Number(this.operacao.ultimaPosicao))) {
            this.adicionarOperacao(numero.toString());
        }
        else {
            numero = Number(this.operacao.ultimaPosicao.toString() + numero.toString());
            this.operacao.ultimaPosicao = numero.toString();
        }
        this.tela.conteudo = numero.toString();
    }
    adicionarOperador(operador) {
        if (isNaN(Number(this.operacao.ultimaPosicao))) {
            this.operacao.ultimaPosicao = operador;
        }
        else {
            if (this.operacao.length === 0) {
                this.adicionarOperacao("0");
            }
            this.adicionarOperacao(operador);
        }
    }
    adicionarPonto() {
        const ultimaPosicao = this.operacao.ultimaPosicao;
        if (this.verificarOperador(ultimaPosicao)) {
            this.adicionarOperacao("0.");
        }
        else if (ultimaPosicao.indexOf(".") === -1) {
            this.operacao.ultimaPosicao = `${ultimaPosicao}.`;
        }
        this.tela.conteudo = this.operacao.ultimaPosicao;
    }
    verificarOperador(valor) {
        return ["+", "-", "*", "/", "%"].includes(valor);
    }
}
//# sourceMappingURL=CacluladoraControle.js.map