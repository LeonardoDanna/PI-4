document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transactionForm');
    const revenueInput = document.getElementById('revenue');
    const expensesInput = document.getElementById('expenses');
    const totalBalanceDisplay = document.getElementById('totalBalance');
    const monthlyProfitDisplay = document.getElementById('monthlyProfit');
    const historyList = document.getElementById('historyList');

    let transactions = [];
    let totalBalance = 0;

    function formatCurrency(input) {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = (parseFloat(value) / 100).toFixed(2);
            e.target.value = value;
        });
    }

    function addToHistory(revenue, expenses, profit) {
        const date = new Date().toLocaleDateString('pt-BR');
        const time = new Date().toLocaleTimeString('pt-BR');
        
        const transaction = {
            date,
            time,
            revenue,
            expenses,
            profit
        };

        transactions.unshift(transaction);
        updateHistoryDisplay();
    }

    function updateHistoryDisplay() {
        historyList.innerHTML = transactions.map(t => `
            <div class="history-item">
                <div class="history-date">${t.date} - ${t.time}</div>
                <div class="history-details">
                    <span>Faturamento: R$ ${t.revenue.toFixed(2)}</span>
                    <span>Despesas: R$ ${t.expenses.toFixed(2)}</span>
                    <span class="profit ${t.profit >= 0 ? 'positive' : 'negative'}">
                        Lucro: R$ ${t.profit.toFixed(2)}
                    </span>
                </div>
            </div>
        `).join('');
    }

    function updateTotalBalance(revenue, expenses) {
        const profit = revenue - expenses;
        totalBalance += profit;
        
        const totalBalanceElement = document.getElementById('totalBalance');
        totalBalanceElement.textContent = `R$ ${totalBalance.toFixed(2)}`;
        
        if (totalBalance < 0) {
            totalBalanceElement.style.color = 'red';
        } else {
            totalBalanceElement.style.color = 'black';
        }
    }

    formatCurrency(revenueInput);
    formatCurrency(expensesInput);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const revenue = parseFloat(revenueInput.value) || 0;
        const expenses = parseFloat(expensesInput.value) || 0;
        const profit = revenue - expenses;
        
        updateTotalBalance(revenue, expenses);
        monthlyProfitDisplay.textContent = `R$ ${profit.toFixed(2)}`;
        
        addToHistory(revenue, expenses, profit);
        form.reset();
    });
});
