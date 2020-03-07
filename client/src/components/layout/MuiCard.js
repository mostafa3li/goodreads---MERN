import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";

// layout
import bookPhoto from "../../assets/book-placeholder.png";
import authorAvatar from "../../assets/userAvatar.png";

const MuiCard = (props) => {
  let item = props;
  const isBook = item.book ? true : false;
  isBook ? (item = { ...item.book }) : (item = { ...item.author });

  return (
    <div className="col-sm-6 col-md-4 col-lg-3">
      <Link to={`/${(isBook && "book") || "author"}s/${item._id}`}>
        <Card className="each-item">
          {isBook ? (
            // isBook
            <CardMedia
              style={{ height: "200px", width: "100%" }}
              image={
                (item.hasPhoto && `/api/books/${item._id}/photo`) || bookPhoto
              }
            />
          ) : (
            // isAuthor
            <CardMedia
              style={{ height: "200px", width: "100%" }}
              image={
                (item.hasAvatar && `/api/authors/${item._id}/avatar`) ||
                authorAvatar
              }
            />
          )}
          <CardActions>
            <Button
              size="small"
              color="primary"
              className="m-auto text-truncate"
            >
              {/* <Link
                className="text-truncate"
                to={`/${(isBook && "book") || "author"}s/${item._id}`}
              > */}
              {item.name}
              {/* </Link> */}
            </Button>
          </CardActions>
          {isBook && (
            <CardActions>
              Author
              <Button size="small" color="primary" className="m-auto">
                <Link
                  className="text-truncate"
                  to={`/authors/${item.author._id}`}
                >
                  {item.author.name}
                </Link>
              </Button>
            </CardActions>
          )}
        </Card>
      </Link>
    </div>
  );
};

export default MuiCard;
