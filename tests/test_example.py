from src.example_package_crouchcd import example


def test_add_one(benchmark):
    assert benchmark(example.add_one, -1) == 0
    assert example.add_one(0) == 1
    assert example.add_one(1) == 2


def test_add_two():
    assert example.add_two(-2) == 0
    assert example.add_two(-1) == 1
    assert example.add_two(0) == 2
