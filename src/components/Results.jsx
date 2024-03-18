import { calculateInvestmentResults, formatter } from '../util/investment.js';

export default function Results({ input }) {
    const dataResults = calculateInvestmentResults(input);
    const initialInvestment = dataResults[0].valueEndOfYear - dataResults[0].interest - dataResults[0].annualInvestment;

    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Investment (Year)</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody className="center">
                {dataResults.map((output, index) => {
                    const totalInterest = output.valueEndOfYear - output.annualInvestment * output.year - initialInvestment;
                    const totalAmountInvested = output.valueEndOfYear - totalInterest;
                    return (
                        <tr key={index}>
                            <td>{output.year}</td>
                            <td>{formatter.format(output.valueEndOfYear)}</td>
                            <td>{formatter.format(output.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(totalAmountInvested)}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
};