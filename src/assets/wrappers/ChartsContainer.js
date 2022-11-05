import styled from "styled-components";

const Wrapper = styled.section`
  margin-top: 4rem;
  text-align: center;
  .lengthZero {
    font-size: 1rem;
    font-weight: 800;
    img {
      display: block;
      margin: 0 auto;
      width: 40%;
      height: 40%;
    }
  }
  button {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    color: var(--primary-500);
    font-size: 1.25rem;
    cursor: pointer;
  }
  button:hover {
    color: var(--primary-300);
  }
  .btn-active {
    color: #fff;
    background: var(--primary-800);
  }
  h4 {
    text-align: center;
    margin-bottom: 0.75rem;
  }
`;

export default Wrapper;
