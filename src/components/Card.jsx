import { useContext, useEffect, useState } from "react";
import currentContext from "../contexts/CurrentUserContext.js";
import api from "../utils/Api.js";

export default function Card({card, onCardClick, onCardLike, onDeleteCard}) {

    const [countLikes, setCountLikes] = useState(card.likes.length);
    const [isLiked, setIsLiked] = useState(false);

    const currentUser = useContext(currentContext);
    const isOwn = card.owner._id === currentUser._id;
  
    
    useEffect(()=>{
      setIsLiked(card.likes.some(i => i._id === currentUser._id));
    },[card.likes, currentUser._id]);

    function clickCard() {
      onCardClick(card);
    }

    function clickLike() {
      if(!isLiked) {
        api.addLike(card._id).then((res)=>{
          setIsLiked(true);
          setCountLikes(res.likes.length)
        });
      }
      else {
        api.removeLike(card._id).then((res)=>{
          setIsLiked(false);
          setCountLikes(res.likes.length)
        });
      }
    }

    function clickDelete() {
      onDeleteCard(card);
    }

    return (
        <article className="element">
              <img
                src={card.link}
                alt={card.name}
                className="element__photo"
                onClick = {clickCard}
              />
              {isOwn && <button className="element__remove" onClick={clickDelete} ></button>}
              <div className="element__text-like">
                <h2 className="element__text">{card.name}</h2>
                <div className="element__block-like">
                  <button type="button" className={`element__like ${isLiked && 'element__like_active'}`} onClick={clickLike}></button>
                  <p className="element__like-count">{countLikes}</p>
                </div>
              </div>
        </article>
    )
}