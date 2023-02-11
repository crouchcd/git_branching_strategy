def add_one(number):
    """Adds one to number.

    Arguments:
        number -- int

    Returns:
        number + 1
    """
    return number + 1


def add_two(number):
    """Adds two to number.

    Arguments:
        number -- int

    Returns:
        number + 2
    """
    return add_one(add_one(number))
