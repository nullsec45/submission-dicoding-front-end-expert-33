import FavoriteRestaurant from '../data/favorite-restaurant';
import { createLikeButtonTemplate, createLikedButtonTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
    async init({ likeButtonContainer, restaurant }) {
        this._likeButtonContainer = likeButtonContainer;
        this._restaurant = restaurant;

        await this._renderButton();
    },

    async _renderButton() {
        const { id } = this._restaurant;

        if (await this._isRestaurantExists(id)) {
            this._renderLiked();
        } else {
            this._renderLike();
        }
    },

    async _isRestaurantExists(id) {
        const restaurant = await FavoriteRestaurant.getRestaurant(id);
        return !!restaurant;
    },

    _renderLike() {
        this._likeButtonContainer.innerHTML = createLikeButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteRestaurant.putRestaurant(this._restaurant);
            this._renderButton();
        });
    },

    _renderLiked() {
        this._likeButtonContainer.innerHTML = createLikedButtonTemplate();

        const likeButton = document.querySelector('#likeButton');
        likeButton.addEventListener('click', async () => {
            await FavoriteRestaurant.deleteRestaurant(this._restaurant.id);
            this._renderButton();
        });
    },
};

export default LikeButtonInitiator;
