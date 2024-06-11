import { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
import { createVariableColors, variableColorsPlugin } from 'tailwindcss-variable-colors'

const config: Config = {
  content: ["./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: createVariableColors(colors),
  },
  plugins: [variableColorsPlugin(colors)],
}

export default config