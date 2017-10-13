// If using tanslations, can register this to some dictionary somewhere in future.
import NodeTypes from '../enums/SceneNodeTypes';

const SceneData = [
    {
        id: "scene-1",
        next: {
            nextState: "SceneState",
            nextMap: "introduction",
            nextScene: "scene-2"
        },
        sequence: [
            {
                name: "Fade",
                type: NodeTypes.FADE,
                waitForInput: false,
                data: {
                    dir: 1
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    initialNode: true,
                    targetId: "mum",
                    str: "...Why don't we discuss this inside {{playername}}?"
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "There's nothing to discuss mum, I never wanted to move!"
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "mum",
                    str: "I'm... I'm sorry... but we couldn't manage without your father..."
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "That's just like you to blame him even now he's gone!"
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "mum",
                    str: "{{playername}}... please don't say that... you're not being fair..."
                }
            },
            {
                name: "Parallel",
                type: NodeTypes.PARALLEL,
                asynced: true,
                children: [
                    {
                        name: "Talk",
                        targetId: "player",
                        type: NodeTypes.TALK,
                        data: {
                            targetId: "penny",
                            str: "Enough already! I've heard enough!"
                        }
                    },
                    {
                        name: "Move",
                        type: NodeTypes.MOVE,
                        data: {
                            targetId: "penny",
                            speed: 75,
                            x: 350, // 135 origin
                            y: 0
                        }
                    }
                ]
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                waitForInput: false,
                data: {
                    targetId: "mum",
                    str: "{{playername}} wait! Come back! You'll get lost!"
                }
            },
            {
                name: "Anim",
                type: NodeTypes.ANIM,
                waitForInput: false,
                data: {
                    targetId: "mum",
                    animName: "runstumble"
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "mum",
                    str: "...Please...just wait...",
                    //exitAfterSeconds: 1,
                    endNode: true
                }
            },
            {
                name: "Fade",
                type: NodeTypes.FADE,
                waitForInput: false,
                data: {
                    dir: -1
                }
            }
        ]
    },
    {
        id: "scene-2",
        next: {
            nextState: "SceneState",
            nextMap: "grasslands",
            nextScene: "scene-3"
        },
        sequence: [
            {
                name: "Fade",
                type: NodeTypes.FADE,
                waitForInput: false,
                data: {
                    dir: 1
                }
            },
            //* Walking through forest *
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "...I've been walking for hours, maybe I should go back.",
                    initialNode: true
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "If only I wanted to go back... I hate this place... Dad, why did you leave us..."
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "Damn it! It's both your faults, why are parents so irritating?! What the hell am I supposed to do...?"
                }
            },
            //* spirit appears, you stop *
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "Wh... what.. is..."
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "spirit",
                    str: "Time... is short..."
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "Who are you?! I don't..."
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "spirit",
                    str: "There is no time to explain. You will have to do."
                }
            },
            //* teleport animation loop *
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "Wait!",
                    endNode: true
                }
            },
            //* teleport casts *
            {
                name: "Fade",
                type: NodeTypes.FADE,
                waitForInput: false,
                data: {
                    dir: -1
                }
            }
        ]
    },
    {
        id: "scene-3",
        next: {
            nextState: "GameState",
            nextMap: "grasslands"
        },
        sequence: [
            {
                name: "Fade",
                type: NodeTypes.FADE,
                waitForInput: false,
                data: {
                    dir: 1
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "...Is this all for real?"
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "Come on Penny, just get a grip. I'm not going to figure anything out just being stood here."
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "...Huh... is that a sword?"
                }
            },
            // *Walk to sword and pick up*
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "Seems like it could come in useful... although I'm not totally sure how to use it..."
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "I'll take it with me just in case."
                }
            },
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
                    targetId: "penny",
                    str: "Seem the only way now is forwards... past all of those... monsters... great.",
                    endNode: true
                }
            },
            {
                name: "Fade",
                type: NodeTypes.FADE,
                waitForInput: false,
                data: {
                    dir: -1
                }
            }
        ]
    }
];

/*
At the end of level 1 (rather than before):
Urgh... what the hell just happened...
Where is this... what's going on?!
"Penny is it?"
Y..yes?
"Ah, excellent. I've been expecting you...."
Please just tell me what's going on...
"You are in the land of the spirits. As luck would have it, you're exactly what we've been looking for 
to help us with our 'problem'."
Problem?
"Indeed. I realize this must be an odd situation..."
Odd!? You have no idea! Look you've got the wrong person, I just want to go home.
"Unfortunately the portal is one way. The only way out of here now regrettably is forwards, and, 
forward is blocked by evil."
...Why... why me?
"You are of special blood. In time, you will learn more of you truly are, worry not. But time is short, 
we must away."
Where?! Where am I supposed to go?
*teleports*
*/

export default SceneData;