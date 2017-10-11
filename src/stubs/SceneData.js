// If using tanslations, can register this to some dictionary somewhere in future.
import NodeTypes from '../enums/SceneNodeTypes';

const SceneData = [
    {
        id: "scene-1",
        sequence: [
            {
                name: "Talk",
                type: NodeTypes.TALK,
                data: {
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
                            str: "Enough already! I need time alone. Anywhere but here."
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
                    str: "{{playername}} wait! Come back! It's too dangerous in the forest alone!"
                }
            },
            {
                name: "Anim",
                type: NodeTypes.ANIM,
                data: {
                    targetId: "mum",
                    animName: "runstumble"
                }
            }
        ]
    }
];

export default SceneData;