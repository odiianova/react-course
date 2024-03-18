export default function UserInputs({userInput, updateInputDate}) {
    return (
        <div id="user-input">
        <div className="input-group">
          <p>
            <label>Initial investment</label>
            <input 
              type="number" 
              value={userInput.initialInvestment}
              onChange={(event) => updateInputDate('initialInvestment', event.target.value)}
              required
            />
          </p>

          <p>
            <label>Anual investment</label>
            <input 
              type="number" 
              value={userInput.annualInvestment} 
              onChange={(event) => updateInputDate('annualInvestment', event.target.value)}
              required
            />
          </p>
        </div>

        <div className="input-group">
          <p>
            <label>Expected return</label>
            <input 
              type="number" 
              value={userInput.expectedReturn} 
              onChange={(event) => updateInputDate('expectedReturn', event.target.value)}
              required
            />
          </p>

          <p>
            <label>Duration</label>
            <input 
              type="number" 
              value={userInput.duration}  
              onChange={(event) => updateInputDate('duration', event.target.value)}
              required
            />
          </p>
        </div>
      </div>
    )
}