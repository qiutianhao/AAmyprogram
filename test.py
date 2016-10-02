def checkio(data):
    M, D, C, L, X, V, I = 'M', 'D', 'C', 'L', 'X', 'V', 'I'
    a, b = divmod(data, 1000)
    c, d = divmod(b, 500)
    e, f = divmod(d, 100)
    if e > 3:
        c += 1
        e -= 3
        D, C = 'C', 'D'
    g, h = divmod(f, 50)
    if h > 25:
        i, j = divmod(h, 10)
    if i > 3:
        g += 1
        i -= 3
        L, X = 'X', 'L'
    k, l = divmod(j, 5)
    if l > 3:
        k += 1
        l -= 3
        V, I = 'I', 'V'
    return "{}{}{}{}{}{}{}".format(a * M, c * D, e * C, g * L,
                                   i * X, k * V, l * I)


if __name__ == '__main__':
    # These "asserts" using only for self-checking and not necessary for auto-testing
    assert checkio(6) == 'VI', '6'
    assert checkio(76) == 'LXXVI', '76'
    assert checkio(499) == 'CDXCIX', ('499', checkio(499))
    assert checkio(3888) == 'MMMDCCCLXXXVIII', '3888'
