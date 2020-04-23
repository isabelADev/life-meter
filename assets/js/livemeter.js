class LiveMeter {

    hpTitle = 'PS';
    mpTitle = 'PE';
    maxHP = 100;
    maxMp = 100;
    hp = this.maxHP;
    mp = this.maxMp;

    constructor(maxHp, maxMP, startHp, startMP, hpTitle, mpTitle) {
        this.hpTitle = hpTitle;
        this.mpTitle = mpTitle;
        this.maxHP = maxHp;
        this.maxMp = maxMP;
        this.hp = startHp;
        this.mp = startMP;
    }

    addHP(amount) {
        var auxAmount = amount;
        if (typeof amount === 'number') {
            auxAmount = parseInt(amount);
            this.hp = Math.min(this.maxHP, this.hp + auxAmount);
        } else {
            this.hp = Math.max(0, this.hp - auxAmount);
        }
    }

    addMP(amount) {
        var auxAmount = amount;
        if (typeof amount === 'number') {
            auxAmount = parseInt(amount);
            if (auxAmount > 0) {
                this.mp = Math.min(this.maxMP, this.mp + auxAmount);
            } else {
                this.mp = Math.max(0, this.mp - auxAmount);
            }
        }
    }

}