import random


def choose_cards(lvl=0):
    game_matrix = []
    card = 0
    cards = Cards()
    temp = 0
    temp1 = True

    if lvl < 5:
       ammount_cards = 4

    elif lvl >= 5 & lvl < 10:
        ammount_cards = 16

    for e in range(ammount_cards):
        card = cards.cardsget(random.randint(1, ammount_cards / 2))
        if card in game_matrix:
            if game_matrix.count(card) == 2:
                while temp1:
                    card = cards.cardsget(random.randint(1, ammount_cards/2))
                    if game_matrix.count(card) == 2:
                        pass
                    else:
                        break


        game_matrix.append(card)

    print(game_matrix)
    return game_matrix

#randomly choose cards
class Cards:
    def __init__(self):
        self.switch = {
            1: "test1",
            2: "test2",
            3: "test3",
            4: "test4",
            5: "test5",
            6: "test6",
            7: "test7",
            8: "test8",
        }
    def cardsget(self, argument):
        return self.switch.get(argument, "Invalid card")

    def cardsindex(self):
        keys = list(self.switch.keys())
        values = list(self.switch.values())
        return keys, values