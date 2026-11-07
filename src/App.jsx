
import React, { useState } from 'react'
import { InputBox } from './components'
import useCurrencyInfo from './hook/UseCurrencyInfo'
import './App.css'

function App() {
  const [amount, setamount] = useState("")
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState("")
  const [isFromOpen, setIsFromOpen] = useState(false)
  const [isToOpen, setIsToOpen] = useState(false)

  const currencyInfo = useCurrencyInfo(from)

  const defaultCurrencyOptions = [
    'usd', 'eur', 'gbp', 'pkr', 'inr', 'aed', 'cny', 'npr', 'bdt',
    'kwd', 'cad', 'sar', 'sgd', 'aud', 'brl', 'mxn', 'chf', 'zar', 'jpy'
  ]

  const options = Array.from(
    new Set([
      ...(currencyInfo ? Object.keys(currencyInfo) : []),
      ...defaultCurrencyOptions,
    ])
  ).sort()

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
    const numericAmount = Number(amount)
    const rate = currencyInfo?.[to]

    if (amount === "" || !rate) {
      setConvertedAmount("")
      return
    }

    setConvertedAmount((numericAmount * rate).toFixed(2))
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
    padding: '0.35rem 0.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    position: 'relative',
    zIndex: 1,
    width: '100%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'calc(100% - 0.5rem) center',
    backgroundSize: '1rem 1rem'
  }

  const dropdownMenuStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 'calc(100% + 0.35rem)',
    width: '100%',
    maxHeight: '8.5rem',
    overflowY: 'auto',
    backgroundColor: '#ffffff',
    border: '1px solid #d1d5db',
    borderRadius: '0.75rem',
    boxShadow: '0 12px 30px rgba(15, 23, 42, 0.12)',
    zIndex: 20
  }

  const dropdownItemStyle = {
    width: '100%',
    border: 'none',
    background: 'transparent',
    padding: '0.5rem 0.75rem',
    textAlign: 'left',
    fontSize: '0.9rem',
    color: '#111827',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
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
              <div className='form-box bg-white h-20 rounded-2xl'
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  position: 'relative'
                }}>

                <label className='currency-label text-gray-400 pb-8'>
                  FROM
                </label>

                <input
                  className='bg-white text-black form'
                  type='number'
                  inputMode="decimal"
                  placeholder='0'
                  min="0"
                  value={amount}
                  onChange={(e) => setamount(e.target.value)}
                  style={inputStyle}
                />

                <div
                  className='currency-select-wrapper'
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '7.5rem' }}
                >
                  <button
                    type='button'
                    className='currency-select'
                    onClick={() => {
                      setIsFromOpen((prev) => !prev)
                      setIsToOpen(false)
                    }}
                    style={selectStyle}
                  >
                    {from.toUpperCase()}
                  </button>

                  {isFromOpen && (
                    <div className='currency-dropdown-menu' style={dropdownMenuStyle}>
                      {options.map((currency) => (
                        <button
                          key={currency}
                          type='button'
                          className={`currency-dropdown-item ${currency === from ? 'active' : ''}`}
                          onClick={() => {
                            setFrom(currency)
                            setIsFromOpen(false)
                          }}
                          style={dropdownItemStyle}
                        >
                          {currency.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
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
              <div className='to-box bg-white h-20 rounded-2xl mt-4'
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  position: 'relative'
                }}>

                <label className='currency-label text-gray-400 pb-8'>
                  To
                </label>

                <input
                  className='bg-white text-black to'
                  type='text'
                  placeholder='0'
                  value={convertedAmount ?? ""}
                  readOnly
                  style={inputStyle}
                />

                <div
                  className='currency-select-wrapper'
                  style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', zIndex: 10, width: '7.5rem' }}
                >
                  <button
                    type='button'
                    className='currency-select'
                    onClick={() => {
                      setIsToOpen((prev) => !prev)
                      setIsFromOpen(false)
                    }}
                    style={selectStyle}
                  >
                    {to.toUpperCase()}
                  </button>

                  {isToOpen && (
                    <div className='currency-dropdown-menu' style={dropdownMenuStyle}>
                      {options.map((currency) => (
                        <button
                          key={currency}
                          type='button'
                          className={`currency-dropdown-item ${currency === to ? 'active' : ''}`}
                          onClick={() => {
                            setTo(currency)
                            setIsToOpen(false)
                          }}
                          style={dropdownItemStyle}
                        >
                          {currency.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          <button
            type='button'
            onClick={handleConvert}
            className='bg-blue-600 py-3 px-8 mt-5 rounded-sm uppercase'
          >
            Convert {from} to {to}
          </button>

        </section>
      </div>
    </main>
  )
}

export default App

