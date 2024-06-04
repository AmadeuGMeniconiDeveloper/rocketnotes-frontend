import PropTypes from "prop-types";
import { Container } from "./styles";

import { Tag } from "../Tag";

export function Note({ data, ...rest }) {
  return (
    <Container {...rest}>
      <header>
        <h1>{data.title}</h1>
      </header>
      {data.tags && (
        <footer>
          {data.tags.map(tag => (
            <Tag title={tag.name} key={tag.id} />
          ))}
        </footer>
      )}
    </Container>
  );
}

Note.propTypes = {
  data: PropTypes.object.isRequired,
};
