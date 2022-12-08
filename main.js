const yearlyIncome = document.getElementById('yearly-income');
const loanAmount = document.getElementById('loan-amount');
const interestRate = document.getElementById('interest-rate');
const purchasePrice = document.getElementById('purchase-price');
const marketValue = document.getElementById('market-value');
const downPayment = document.getElementById('down-payment');
const loanTerm = document.getElementById('loan-term');
const modal = document.getElementById('modal');
const monthlyPayment = document.getElementById('monthly-payment');
const totalInterest = document.getElementById('total-interest');
const totalPayment = document.getElementById('total-payment');
const hoaFeeContainer = document.getElementById('hoa-fee-container');
const hoaSelector = document.getElementById('hoa-selector');
const hoaYesNo = document.getElementById('hoa-yes-no');
const hoaFee = document.getElementById('hoa-fee');
const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});
function calculate() {
  const result = calculatePayment(
    purchasePrice,
    marketValue,
    downPayment,
    yearlyIncome,
    interestRate,
    loanTerm,
    hoaFee
  );
  modal.style.display = 'block';
  monthlyPayment.innerHTML = `<br>Your monthly income is: 
  ${formatter.format(yearlyIncome.value)}
   <br> Your monthly payment is: ${formatter.format(loanAmount.value)} 
   <br> Your total interest is: ${formatter.format(
     interestRate.value
   )} <br> Your total payment is: ${formatter.format(loanAmount.value)}
  <br> Your loan term is: ${loanTerm.value} years
  <br> Your purchase price is: ${formatter.format(purchasePrice.value)}
  <br> Your market value is: ${formatter.format(marketValue.value)}
  <br> Your down payment is: ${formatter.format(downPayment.value)}
    <br> Your HOA fee is: ${formatter.format(result)}
  `;
}

function closeModal() {
  modal.style.display = 'none';
}

function showHoaFeeBox() {
  hoaSelector.value = hoaSelector.value === 'yes' ? 'no' : 'yes';
  hoaYesNo.innerHTML = hoaSelector.value === 'yes' ? 'Yes' : 'No';
  hoaSelector.checked = hoaSelector.checked === true ? false : true;
  if (hoaSelector.value === 'yes') {
    hoaFeeContainer.classList.remove('hidden');
  } else {
    hoaFeeContainer.classList.add('hidden');
  }
  if (hoaSelector.checked === true) {
    console.log(hoaSelector.checked);
  } else {
    console.log(hoaSelector.checked);
  }
}
