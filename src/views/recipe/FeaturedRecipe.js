import React from 'react';
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom';
import {CroppedImage} from '../components/FilteredImage'
import {device} from '../../utils/device'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import {format, fromUnixTime} from 'date-fns';
import TextTruncate from "react-text-truncate";

const ImagePosition = styled.div`
  grid-column-start:1;
  grid-column-end:8;
  grid-row-start:1;
  grid-row-end:2;
  img{
    object-fit:cover;
  }
  max-height:360px;
  overflow:hidden;
  box-shadow:0 0 0 0 rgba(0,0,0,0);
  transition:all 300ms ease-in-out;
  @media ${device.mobile} {
    grid-column-start:1;
    grid-column-end:6;
    opacity:0.85;
  }
`

const Text = styled.div`
  h1 {
    font-family: "Space Grotesk", sans-serif;
  }
  margin-top: 48px;
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 2;
  transform: translate(0, 0);
  transition: all 300ms ease-in-out;
  mix-blend-mode: normal;
  @media ${device.mobile} {
    margin-top:0;
    grid-column-start: 6;
    grid-column-end: 16;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  column-gap:24px;
  align-items:top;
  cursor: pointer;
  &:hover,&:active{
    ${ImagePosition}{
      box-shadow:0 4px 8px -1px rgba(0,0,0,0.25);
    }
    ${Text}{
      transform: translate(0, -5%);
    }
  }
  @media ${device.mobile} {
    align-items: top;
  }
`

const DateStamps = ({ createdAt, updatedAt }) => {
  const displayUpdatedAt = updatedAt != null && createdAt != updatedAt;
  if (createdAt == null && updatedAt == null){
    return null;
  }
  return (
    <>
      <Typography variant="overline" color="primary">
        PUBLISHED: {format(fromUnixTime(createdAt * 0.001), "PPP")}
      </Typography>
      {displayUpdatedAt && (
        <Typography variant="overline" color="primary">
          LAST UPDATED: {format(fromUnixTime(updatedAt * 0.001), "PPP")}
        </Typography>
      )}
    </>
  );
};


const FeaturedRecipe = ({side, color, recipe}) => {
  const mobile = useMediaQuery(`${device.mobile}`);
  const history = useHistory();
  return (
    <>
      <Wrapper
        onClick={() => {
          history.push(`/recipe/${recipe.id}`);
        }}
      >
        <ImagePosition>
          <CroppedImage
            imageUrl={recipe.imageUrl ?? `/images/pumpkin_tart.jpg`}
          />
        </ImagePosition>
        <Text>
          <DateStamps
            createdAt={recipe.createdAt}
            updatedAt={recipe.updatedAt}
          />
          <Typography
            gutterBottom
            variant="h1"
            style={{
              fontWeight: "bold",
              lineHeight: "56px",
              color: "rgba(0,0,0,.8)",
            }}
          >
            {recipe.name}
          </Typography>

          <TextTruncate
            line={mobile ? 3 : 6}
            element="span"
            truncateText="..."
            text={recipe.description}
          />
        </Text>
      </Wrapper>
    </>
  );
}

FeaturedRecipe.propTypes = {
  side: PropTypes.oneOf(['LEFT','RIGHT']),
  recipe: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.string,
    imageUrl: PropTypes.string,
    imageColor: PropTypes.oneOf(['MAGENTA','CYAN','YELLOW']),
    imageAltText: PropTypes.string,
    recipeId: PropTypes.string.isRequired
  })
}

export default FeaturedRecipe;
