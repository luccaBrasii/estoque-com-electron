const properties = [
    'name',
    'wins',
    'draws',
    'losses',
    'total',
    'transaction'
];

properties.forEach(function (val) {

    let orderClass = '';

    document.getElementById(val).addEventListener('click', function (e) {
        e.preventDefault();
        const activeFilters = document.querySelectorAll('.filter__link.filter__link--active');
        activeFilters.forEach(function (filter) {
            if (filter !== this) {
                filter.classList.remove('filter__link--active');
            }
        }.bind(this));
        this.classList.toggle('filter__link--active');
        document.querySelectorAll('.filter__link').forEach(function (link) {
            link.classList.remove('asc', 'desc');
        });

        if (orderClass === 'desc' || orderClass === '') {
            this.classList.add('asc');
            orderClass = 'asc';
        } else {
            this.classList.add('desc');
            orderClass = 'desc';
        }

        const parent = this.closest('.header__item');
        const index = Array.prototype.indexOf.call(document.querySelectorAll('.header__item'), parent);
        const table = document.querySelector('.table-content');
        const rows = Array.from(table.querySelectorAll('.table-row'));
        const isSelected = this.classList.contains('filter__link--active');
        const isNumber = this.classList.contains('filter__link--number');

        rows.sort(function (a, b) {

            function regex(x) {
                const valor = x;

                if (x.includes('R$')) {
                    let regex = /^R\$(\d*)(,?)(\d+)/g;
                    const novoValor = valor.replace(regex, "$1$3");
                    return novoValor
                }
                else {
                    return valor
                }

            }

            let x = regex(a.querySelectorAll('.table-data')[index].textContent)
            let y = regex(b.querySelectorAll('.table-data')[index].textContent)



            if (isNumber === true) {
                x = parseFloat(x);
                y = parseFloat(y);

                if (isSelected) {
                    return x - y;
                } else {
                    return y - x;
                }

            } else {

                if (isSelected) {
                    if (x < y) return -1;
                    if (x > y) return 1;
                    return 0;
                } else {
                    if (x > y) return -1;
                    if (x < y) return 1;
                    return 0;
                }
            }
        });

        rows.forEach(function (row) {
            table.appendChild(row);
        });

        return false;
    });

});


