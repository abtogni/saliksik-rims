import withMT from "@material-tailwind/react/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
     colors:{
      backround: '#D1462F'
     }
    },
  },
  plugins: [],
});