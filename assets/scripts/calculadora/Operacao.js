export default class Operacao {
    constructor(opts, operacao = []) {
        this.operacao = operacao;
        this.memoriaNumero = 0;
        this.memoriaOperador = "";
        this.onCalculado = opts.onCalculado;
    }
    adicionar(valor) {
        if (this.operacao.length === 3) {
            this.calcular();
        }
        return this.operacao.push(valor);
    }
    obterResultado() {
        let resultado = "0";
        try {
            resultado = (eval(this.operacao.join(""))).toString();
        }
        catch (e) {
            resultado = "ERRO";
        }
        return resultado;
    }
    calcular() {
        let resultado = this.obterResultado();
        if (resultado.length > 12) {
            resultado = resultado.substring(0, 12);
        }
        this.operacao = [resultado];
        this.onCalculado(resultado);
    }
    porcentagem() {
        if (this.length === 3) {
            switch (this.operacao[1]) {
                case "+":
                case "-":
                    const porcento = (Number(this.operacao[0]) * Number(this.operacao[2])) / 100;
                    this.memoriaNumero = porcento;
                    this.ultimaPosicao = porcento.toString();
                    return porcento.toString();
                default:
                    this.memoriaNumero = Number(this.ultimaPosicao) / 100;
                    this.ultimaPosicao = this.memoriaNumero.toString();
                    return this.memoriaNumero.toString();
            }
        }
        return "0";
    }
    limpar() {
        this.operacao = [];
        this.memoriaNumero = 0;
        this.memoriaOperador = "";
    }
    desfazer() {
        this.operacao.pop();
        return this.length ? this.operacao[0] : "0";
    }
    get ultimaPosicao() {
        return this.operacao.length ? this.operacao[this.operacao.length - 1] : "0";
    }
    set ultimaPosicao(valor) {
        const ultimoIndex = this.operacao.length ? this.operacao.length - 1 : 0;
        this.operacao[ultimoIndex] = valor;
    }
    get length() {
        return this.operacao.length;
    }
}
//# sourceMappingURL=Operacao.js.map