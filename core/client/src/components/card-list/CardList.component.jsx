import React from 'react';
import { Card } from '../card/card.component';
import '../card-list/cardlist.component.styles.scss';

export const CardList = ({ showDetail, bots }) => {
    // console.log(props)
    return (
        <div>
            <div className='card-list'>
                {bots.map(list =>
                    <Card key={list.bot_id}
                        list={list}
                        showDetail={() => showDetail(list.bot_id)}
                    />
                )}
            </div>
        </div>
    )
}