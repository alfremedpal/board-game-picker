import React, { useState } from 'react'
import { Icon, Link } from "@chakra-ui/react"
import { GiMeeple } from 'react-icons/gi'
import { BsClock } from 'react-icons/bs'

import classes from './Game.module.css'

export default function Game(props) {

    const [detailsVisible, setDetailsVisible] = useState(false)

    const formatPlayerCount = (min, max) => {
        if (min === max) {
            return min
        }

        return `${min} - ${max}`
    }

    return (
        <>
        <div className={classes.main} onClick={() => setDetailsVisible(!detailsVisible)}>
            <img src={props.game.thumbnail} alt={props.game.name['#text']} width="75" height="75"/>
            <div className={classes.info}>
                <div>
                    <h3>{props.game.name['#text']} <small>({props.game.yearpublished})</small></h3>
                </div>
                <div>
                    <Icon color="teal.500" as={GiMeeple}/> {formatPlayerCount(props.game.stats['@_minplayers'], props.game.stats['@_maxplayers'])}
                    &nbsp;
                    <Icon color="teal.500" as={BsClock}/> {props.game.stats['@_playingtime']}
                    <br />
                    <Link 
                        href={`https://boardgamegeek.com/boardgame/${props.game['@_objectid']}`} 
                        isExternal 
                        color="gray.500"
                    >
                        View on BGG
                    </Link>
                </div>
            </div>
        </div>
        {/* <Collapse isOpen={detailsVisible}>
            <div className={classes.details}>
                Hey
            </div>
        </Collapse> */}
        </>
    )
}