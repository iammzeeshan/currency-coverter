import React, { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hook/UseCurrencyInfo'
import './App.css'

function App() {
  const [amount, setamount] = useState(null)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(null)

  const currencyInfo = useCurrencyInfo()

  const options = Object.keys(currencyInfo ?? {})

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setamount(convertedAmount)
  }

  const handleSwap = (e) => {
    e.preventDefault()
    swap()
  }

  const convert = () => {
    const numericAmount = Number(amount) || 0
    const rate = currencyInfo?.[to] ?? 0
    setConvertedAmount(numericAmount * rate)
  }

  const handleConvert = (e) => {
    e.preventDefault()
    convert()
  }

  const selectStyle = {
    border: 'none',
    background: 'transparent',
    outline: 'none',
    fontSize: '0.9rem',
    color: '#111827',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    padding: '0.35rem 2rem 0.35rem 0.5rem',
    textAlign: 'right',
    cursor: 'pointer',
    position: 'absolute',
    right: '0.75rem',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'calc(100% - 0.5rem) center',
    backgroundSize: '1rem 1rem'
  }

  const inputStyle = {
    width: 'calc(100% - 5rem)',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontSize: '1.5rem',
    textAlign: 'left',
    alignSelf: 'flex-end',
    margin: 0,
    padding: '0 0.5rem 0 0',
    position: 'absolute',
    left: '1rem',
    right: '4.5rem',
    bottom: '0.65rem'
  }

  return (
    <main className='app-shell'>
      <div className='app-overlay'>
        <section className='currency-card'>
          <p className='eyebrow'>Live Currency Converter</p>
          <div className='convert-boxes'>
            <div className='currency-group'>
              <div className='form-box bg-white h-20 rounded-2xl' style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0.75rem 1rem', position: 'relative' }}>
                <label className='currency-label text-gray-400 pb-8'>FROM</label>
                <input
                  className='bg-white text-black form'
                  type='text'
                  inputMode="numeric"
                  placeholder='0'
                  min="0"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                  style={inputStyle}
                />
                <select
                  className='currency-select'
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  style={selectStyle}
                >
                  <option value='usd'>USD</option>
                  <option value='eur'>EUR</option>
                  <option value='gbp'>GBP</option>
                  <option value='pkr'>PKR</option>
                  <option value='inr'>INR</option>
                  <option value='aed'>AED</option>
                </select>
              </div>
            </div>

            <button
              type='button'
              onClick={handleSwap}
              className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 py-3 px-5 rounded-lg font-bold border-4 border-white z-12"
            >
              Swap
            </button>

            <div className='currency-group'>
              <div className='to-box bg-white h-20 rounded-2xl mt-4' style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0.75rem 1rem', position: 'relative' }}>
                <label className='currency-label text-gray-400 pb-8'>To</label>
                <input
                  className='bg-white text-black to'
                  type='text'
                  inputMode="numeric"
                  placeholder='0'
                  min="0"
                  value={convertedAmount}
                  readOnly
                  style={inputStyle}
                />
                <select
                  className='currency-select'
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  style={selectStyle}
                >
                  <option value='pkr'>PKR</option>
                  <option value='usd'>USD</option>
                  <option value='eur'>EUR</option>
                  <option value='gbp'>GBP</option>
                  <option value='inr'>INR</option>
                  <option value='aed'>AED</option>
                </select>
              </div>
            </div>
          </div>
          <button type='button' onClick={handleConvert} className='bg-blue-600 py-3 px-8 mt-5 rounded-sm uppercase'>Convert {from} to {to}</button>
        </section>
      </div>
    </main>
  )
}

export default App
