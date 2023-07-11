import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import { getGames } from '../domain/games.actions'
import { config } from '../config/base'
import { IGame } from '../domain/game'
import {
  Button,
  Card,
  Dropdown,
  FormElement,
  Grid,
  Input,
  Row,
  Text
} from '@nextui-org/react'
import { ServerErrorContainer } from './server-error/server-error.container'
import { LoaderContainer } from '@/modules/commom/domain/application/loader/loader.container'
import { Heart } from '../icons/heart'
import { Star } from '../icons/star'
import { useAuthentication } from '@/modules/contexts/authentication/application/authentication.context'
import { getRates, rateGame } from '../domain/rate.actions'
import { useRouter } from 'next/router'
import { IRate } from '@/modules/commom/domain/_types/rate'

export const IndexContainer = () => {
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<IGame[]>([])
  const [search, setSearch] = useState<string>('')
  const [genre, setGenre] = useState<string>('Todos')
  const [error, setError] = useState<string>('')
  const [rates, setRates] = useState<IRate[]>([])

  const { userData } = useAuthentication()
  const { push } = useRouter()

  useEffect(() => {
    loadRates()
    loadGames()
  }, [userData])

  const loadGames = async () => {
    const response = await getGames({
      gamesOutput: config.gamesProvider
    })
    if (response.data) {
      setGames(response.data)
    } else {
      setError(response.message)
    }
    setLoading(false)
  }

  const loadRates = async () => {
    if (userData != null) {
      const response = await getRates({
        token: userData.token,
        rateOutput: config.rateProvider
      })
      setRates(response)
    }
  }

  const visibleGames = useMemo(() => {
    let filter = games.filter(game => {
      return game.title.toLowerCase().includes(search.toLowerCase())
    })
    if (genre.length > 0) {
      filter = filter.filter(game => game.genre === genre || genre == 'Todos')
    }
    return filter
  }, [search, games, genre])

  const allGenres = useMemo(() => {
    let genres = games.map(game => game.genre)
    genres = genres.filter((genre, index) => genres.indexOf(genre) === index)
    let all = ['Todos']
    all.push(...genres)
    return all
  }, [games])

  const handleSearchChange = (e: ChangeEvent<FormElement>) => {
    setSearch(e.target.value)
  }

  const handleLike = async (gameId: number) => {
    if (userData != null) {
      const like = !rates.find(rate => rate.gameId == gameId)?.like
      const stars = rates.find(rate => rate.gameId == gameId)?.stars || 0
      await rateGame({
        gameId,
        like,
        stars: stars,
        token: userData.token,
        rateOutput: config.rateProvider
      })
      loadRates()
    } else {
      push('/auth')
    }
  }

  const handleStars = async (gameId: number, stars: number) => {
    if (userData != null) {
      const like = rates.find(rate => rate.gameId == gameId)?.like || false
      const currentStars = rates.find(rate => rate.gameId == gameId)?.stars || 0
      await rateGame({
        gameId,
        like,
        stars: stars == currentStars ? 0 : stars,
        token: userData.token,
        rateOutput: config.rateProvider
      })
      loadRates()
    } else {
      push('/auth')
    }
  }

  if (loading) {
    return <LoaderContainer />
  }

  if (error.length > 0) {
    return <ServerErrorContainer error={error} />
  }

  return (
    <div
      style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px'
      }}
    >
      <div
        style={{
          width: '800px',
          maxWidth: '98vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <div style={{ display: 'flex', gap: '10px' }}>
          <Input
            value={search}
            onChange={handleSearchChange}
            clearable
            underlined
            labelPlaceholder="Pesquisa"
          />
          <Dropdown>
            <Dropdown.Button flat color="secondary">
              Generos
            </Dropdown.Button>
            <Dropdown.Menu
              color="secondary"
              aria-label="Gêneros"
              css={{ $$dropdownMenuWidth: '280px' }}
              selectionMode="single"
              selectedKeys={[genre]}
              disallowEmptySelection
              onSelectionChange={e => {
                setGenre(Array.from(e)[0]?.toString() || genre)
              }}
            >
              {allGenres.map(genre => (
                <Dropdown.Item key={genre} textValue={genre}>
                  {genre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <Cards
          games={visibleGames}
          rates={rates}
          handleLike={handleLike}
          handleStars={handleStars}
        />
      </div>
    </div>
  )
}

const Stars = ({
  gameId,
  number,
  handleStars
}: {
  gameId: number
  number: number
  handleStars: (gameId: number, stars: number) => void
}) => {
  const arr = new Array(5).fill(0)

  return (
    <>
      {arr.map((_, n) => {
        if (n < number) {
          return (
            <Star
              onClick={() => {
                handleStars(gameId, n + 1)
              }}
              solid
              key={`${n}`}
            />
          )
        } else {
          return (
            <Star
              onClick={() => {
                handleStars(gameId, n + 1)
              }}
              key={`${n}`}
            />
          )
        }
      })}
    </>
  )
}

const Cards = ({
  games,
  rates,
  handleLike,
  handleStars
}: {
  games: IGame[]
  rates: IRate[]
  handleLike: (gameId: number) => void
  handleStars: (gameId: number, stars: number) => void
}) => {
  return (
    <Grid.Container gap={3} style={{ width: '100%' }}>
      {games.map(game => (
        <Grid
          xs={12}
          sm={4}
          key={`${game.id}`}
          alignContent="center"
          justify="center"
        >
          <Card isHoverable>
            <Card.Header>
              <Text
                css={{
                  color: '$accents7',
                  fontWeight: '$semibold',
                  fontSize: '$sm'
                }}
              >
                {game.genre}
              </Text>
            </Card.Header>
            <Card.Body css={{ p: 0 }}>
              <Card.Image
                src={game.thumbnail}
                objectFit="cover"
                width="100%"
                height={140}
                alt={game.title}
              />
            </Card.Body>
            <Card.Footer css={{ justifyItems: 'flex-start' }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>{game.title}</Text>
              </Row>
            </Card.Footer>
            <Card.Divider />
            <Card.Footer css={{ justifyItems: 'flex-start' }}>
              <Row wrap="wrap" justify="space-between" align="center">
                <Text b>
                  <Button
                    light
                    auto
                    color="error"
                    onClick={() => handleLike(game.id)}
                  >
                    <Heart
                      solid={rates.find(rate => rate.gameId == game.id)?.like}
                    />
                  </Button>
                </Text>
                <Text b>
                  <Stars
                    handleStars={handleStars}
                    gameId={game.id}
                    number={
                      rates.find(rate => rate.gameId == game.id)?.stars || 0
                    }
                  />
                </Text>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      ))}
    </Grid.Container>
  )
}
