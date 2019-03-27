import { css } from 'styled-components'

const sizes = {
   tablet: 1000,
   mobile: 650,
};

export default Object.keys(sizes).reduce((acc, label) => {
   acc[label] = (...args) => css`
      @media (max-width: ${sizes[label]}px) {
         ${css(...args)};
      }
   `;
   return acc
}, {});